import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-white text-neutral-900 antialiased">
      <Head />
      <body className="min-h-screen bg-neutral-50 dark:bg-neutral-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
