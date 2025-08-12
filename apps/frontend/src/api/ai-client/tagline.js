export const generateTagline = async ({
  product,
  type,
  audience,
  style,
  accessToken,
  refreshToken,
  onMessage,
  onError,
}) => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch('http://localhost:5000/api/ai/generate-tagline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'x-refresh-token': refreshToken,
      },
      body: JSON.stringify({ product, type, audience, style }),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    if (!response.body) throw new Error('No SSE body found');

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    const readStream = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.length > 0) {
              buffer.split('\n').forEach((line) => {
                  if (line.startsWith('data:')) {
                      const data = line.slice(5).trim();
                      console.log("ssss",data)
                if (data) onMessage(data);
              }
            });
          }
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        lines.forEach((line) => {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (data) onMessage(data);
          }
        });
      }
    };

    readStream().catch(onError);
  } catch (err) {
    if (err.name !== 'AbortError') onError(err);
  }

  return () => {
    controller.abort();
    console.log('SSE stream closed');
  };
};
