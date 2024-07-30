'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'
import "./globals.css";
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Divider,
  extendTheme,
} from "@chakra-ui/react";
import AppContextProvider from "../context/app-context";
import Navigation from "../components/navigation/navigation";
import Header from "../components/common/header";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Video Streaming App",
  description: "Video streaming and sharing app created by Deborah Aguer",
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

export default function RootLayout({ children }: any) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <AppContextProvider>
            <Header />
            <Divider />
            <main>
              <Box
                mt={{ base: "6.7rem", md: "3.8rem" }}
                display="flex"
                alignItems="flex-start"
                justifyContent={"flex-start"}
                gap={{ lg: "1rem", md: "0.5rem", base: "0rem" }}
              >
                { pathname !== '/auth/login' && <Navigation /> }
                <Box w={"100%"} ml={{ base: "0", md: 0, lg: "14rem" }}>
                  {children}
                </Box>
              </Box>
            </main>
          </AppContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
