import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { DevTools, Tolgee, TolgeeProvider, useTolgeeSSR } from "@tolgee/react";
import { FormatIcu } from "@tolgee/format-icu";
import * as de from "./i18n/de.json";
import * as en from "./i18n/en.json";

export { useTranslate } from "@tolgee/react";

const tolgeeInstance = Tolgee()
  .use(FormatIcu())
  .use(DevTools())
  .init({
    apiKey:
      process.env["NODE_ENV"] !== "production"
        ? process.env["NEXT_PUBLIC_CLIENT_TOLGEE_API_KEY"]
        : undefined,
    apiUrl:
      process.env["NODE_ENV"] !== "production"
        ? process.env["NEXT_PUBLIC_CLIENT_TOLGEE_API_URL"]
        : undefined,
    fallbackLanguage: "en",
    defaultLanguage: "de",
  });

export const I18nProvider: React.FC<
  PropsWithChildren & { forceLanguage?: string }
> = ({ children, forceLanguage }) => {
  const tolgee = useTolgeeSSR(tolgeeInstance, forceLanguage, { en, de });

  return <TolgeeProvider tolgee={tolgee}>{children}</TolgeeProvider>;
};

export const useCurrentLanguage = (): string => {
  const router = useRouter();

  return router.locale ?? router.defaultLocale!;
};
