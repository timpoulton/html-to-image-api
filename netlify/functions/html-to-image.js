exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { html, width = 800, height = 600, format = 'png' } = JSON.parse(event.body);

    if (!html) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'HTML content is required' })
      };
    }

    // For now, return success with base64 placeholder
    const placeholderImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        image: 'data:image/png;base64,' + placeholderImage,
        format: format,
        size: 100
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      })
    };
  }
};
