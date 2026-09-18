// دالة سحابية (Netlify Function) تُنفَّذ على خوادم Netlify، وليس في متصفح
// الزائر — لذلك التوكن السري لا يصل أبدًا إلى أي جهاز خارجي.
//
// تقرأ بيانات GitHub من "متغيرات البيئة" (Environment Variables) التي
// تُضبط من: Netlify ← Site configuration ← Environment variables
// (GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN) — راجع FIREBASE_SETUP_AR.md.

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'لم يتم ضبط متغيرات البيئة في Netlify بعد (GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN).',
      }),
    };
  }

  try {
    const { path, content, message } = JSON.parse(event.body || '{}');
    if (!path || !content) {
      return { statusCode: 400, body: JSON.stringify({ error: 'بيانات الرفع ناقصة.' }) };
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: 'token ' + token,
        'Content-Type': 'application/json',
        'User-Agent': 'mti-website-upload-function',
      },
      body: JSON.stringify({
        message: message || ('رفع ملف: ' + path),
        content,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: err.message || 'فشل الرفع إلى GitHub.' }),
      };
    }

    const fileUrl = `https://cdn.jsdelivr.net/gh/${owner}/${repo}@main/${path}`;
    return { statusCode: 200, body: JSON.stringify({ url: fileUrl }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
