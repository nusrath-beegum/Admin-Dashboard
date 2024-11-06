import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNavbarRoutes = ["/login"];
  return (
    <>
      <Provider store={store}>
        {!hideNavbarRoutes.includes(router.pathname) && <Navbar />}

        <Component {...pageProps} />
      </Provider>
      ;
    </>
  );
}
