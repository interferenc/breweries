import { createI18n, useI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "en",
  missingWarn: false,
  fallbackFormat: true,
  messages: {
    en: {},
    de: {}
  }
});

export const { t, d, n } = useI18n();
