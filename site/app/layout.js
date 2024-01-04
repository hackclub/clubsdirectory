// import '@hackclub/theme/fonts/reg-bold.css'
import "@hackclub/theme/fonts/reg-bold.css";

export const metadata = {
  title: {
    template: "%s - Hackclubs Directory",
    default: "Hackclubs Directory - Hackclub",
  },
  description:
    "The Clubs Directory unlocks the power of cross-club collaboration, allowing clubs to transcend boundaries and create together.",
  openGraph: {
    title: "Hackclubs Directory - Hackclub",
    description:
      "The Clubs Directory unlocks the power of cross-club collaboration, allowing clubs to transcend boundaries and create together.",
    url: "https://directory.hackclub.com/",
    siteName: "Hackclubs Directory",
    images: [
      {
        url: "/images/flag-orpheus-left.svg",
        width: 560,
        height: 315,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "https://assets.hackclub.com/favicons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "https://assets.hackclub.com/favicons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    shortcut: "/shortcut-icon.png",
    apple: [
      {
        url: "https://assets.hackclub.com/favicons/apple-touch-icon.png",
        type: "image/png",
      },
    ],
  },
  manifest: "https://assets.hackclub.com/favicons/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Hacklubs Directory - Hackclub",
    description:
      "The Clubs Directory unlocks the power of cross-club collaboration, allowing clubs to transcend boundaries and create together.",
    creator: "@hackclub",
    images: ["/images/flag-orpheus-left.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
