export const login = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login gagal, periksa kembali username/password.');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};