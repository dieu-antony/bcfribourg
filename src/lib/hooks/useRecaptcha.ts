const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const useRecaptcha = () => {
  const requestToken = async (action: string): Promise<string | null> => {
    if (typeof window === "undefined" || !window.grecaptcha || !SITE_KEY) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Missing grecaptcha or site key");
      }
      return null;
    }

    try {
      await new Promise<void>((resolve) => {
        window.grecaptcha.ready(resolve);
      });

      const token = await window.grecaptcha.execute(SITE_KEY, { action });
      return token;
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("reCAPTCHA execution failed:", err);
      }
      return null;
    }
  };

  return { requestToken };
};
