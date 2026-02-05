import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "K-StoryLab - K-Story 1000",
    description: "Learn Korean through stories and AI magic.",
    manifest: "/manifest.json",
    themeColor: "#4F46E5",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "K-StoryLab",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
