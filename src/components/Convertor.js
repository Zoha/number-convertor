import { useCallback, useContext, useRef, useState } from "react";
import SnackContext from "../context/snackContext";
import useDirectionDetectorString from "../hooks/useDirectionDetectorString";
import {
  convertArToEn,
  convertArToFa,
  convertEnToAr,
  convertEnToFa,
  convertFaToAr,
  convertFaToEn,
} from "../utils/convertor";
import Card from "./Card";
import CardTabs from "./CardTabs";
import ReverseButton from "./ReverseButton";
import CopyButton from "./CopyButton";
import TextAreaInput from "./TextAreaInput";

const LANGS = {
  en: "en",
  ar: "ar",
  fa: "fa",
};

const DEFAULT_TABS = [
  {
    key: LANGS.fa,
    name: "به فارسی",
    isActive: true,
  },
  {
    key: LANGS.en,
    name: "به انگلیسی",
    isActive: false,
  },
  {
    key: LANGS.ar,
    name: "به عربی",
    isActive: false,
  },
];

function Convertor() {
  // because we want to detect that textarea should be rtl or ltr
  const [sourceText, setSourceText, isSourceRtl] =
    useDirectionDetectorString("");

  // for controlling tabs in left box
  const [languagesTabs, setLanguagesTabs] = useState(DEFAULT_TABS);
  const activeLanguageTab = languagesTabs.find((i) => i.isActive);

  // for selecting result text with one click
  const resultTextareaRef = useRef();

  // for showing snack after success in coping the result text
  const { showSnack } = useContext(SnackContext);

  function updateSourceText(event) {
    setSourceText(event.target.value);
  }

  // generates replaced text for final result
  const convertNumbers = useCallback(() => {
    switch (activeLanguageTab.key) {
      case LANGS.fa:
        let enToFa = convertEnToFa(sourceText);
        let arToFa = convertArToFa(enToFa);
        return arToFa;
      case LANGS.en:
        let faToEn = convertFaToEn(sourceText);
        let arToEn = convertArToEn(faToEn);
        return arToEn;
      case LANGS.ar:
        let faToAr = convertFaToAr(sourceText);
        let enToAr = convertEnToAr(faToAr);
        return enToAr;
      default:
        return "";
    }
  }, [activeLanguageTab, sourceText]);

  const convertedNumbers = convertNumbers();

  // we use callback because this is dependency of copyResult func in below
  const selectAllTheResultTextareaText = useCallback(() => {
    resultTextareaRef.current.select();
  }, [resultTextareaRef]);

  // we use callback because we will pass this to copy button
  const copyResult = useCallback(() => {
    selectAllTheResultTextareaText();
    document.execCommand("copy");
    showSnack("متن با موفقیت در کلیپ بورد کپی شد");
  }, [selectAllTheResultTextareaText, showSnack]);

  // because we send reverse callback as a prop for convert button
  const reverse = useCallback(() => {
    let englishShouldBeActive = activeLanguageTab.key !== LANGS.en;
    // if english should be active turn english isActive
    // and turn all other tabs to not active
    // else do the same for farsi language
    setLanguagesTabs((tabs) => {
      return tabs.map((tab) =>
        englishShouldBeActive
          ? tab.key === LANGS.en
            ? { ...tab, isActive: true }
            : { ...tab, isActive: false }
          : tab.key === LANGS.fa
          ? { ...tab, isActive: true }
          : { ...tab, isActive: false }
      );
    });
    setSourceText(convertedNumbers);
  }, [activeLanguageTab, convertedNumbers, setSourceText]);

  // the right card jsx
  // this card contains source textarea
  const RightCard = (
    <Card>
      <p className="pb-5 text-grey md:px-16">
        متنی که میخواهید اعداد آن را تبدیل کنید را در کادر زیر نوشته دکمه
        <span className="text-primary"> تبدیل </span>
        را بزنید
      </p>
      <TextAreaInput
        value={sourceText}
        onChange={updateSourceText}
        placeholder="متن دلخواه ..."
        style={{ direction: isSourceRtl ? "rtl" : "ltr" }}
      />
    </Card>
  );

  // the left card jsx
  // contains tabs - result textarea and a copy button
  const LeftCard = (
    <Card>
      <CardTabs tabs={languagesTabs} setTabs={setLanguagesTabs} />
      <div onClick={selectAllTheResultTextareaText} className="mt-5 relative">
        <CopyButton onClick={copyResult} />
        <TextAreaInput
          ref={resultTextareaRef}
          value={convertedNumbers}
          readOnly
          placeholder="بعد تبدیل متن شما در اینجا قرار میگیرد"
          style={{ direction: isSourceRtl ? "rtl" : "ltr" }}
        />
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:px-10 md:mx-10 relative">
      <div className="text-center mt-20 md:mt-0">{RightCard}</div>
      <ReverseButton onReverse={reverse} />
      <div className="text-center">{LeftCard}</div>
    </div>
  );
}

export default Convertor;
