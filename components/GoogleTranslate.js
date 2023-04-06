import { useEffect, useState } from "react";
import SelectPicker from "rsuite/SelectPicker";
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import React from 'react'

const GoogleTranslate = () => {

    const [selected, setSelected] = useState(null)

    const languages = [
        { label: 'English', value: '/auto/en' },
        { label: 'हिन्दी', value: '/auto/hi' },
        { label: "मराठी", value: '/auto/mr' },
        { label: 'ગુજરાતી', value: '/auto/gu' },
        { label: `Русский`, value: '/auto/ru' },
        { label: 'Polski', value: '/auto/pl' },
        { label: 'Deutsch', value: '/auto/de' },
    ];

    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;


        if (hasCookie('googtrans')) {
            setSelected(getCookie('googtrans'))
        }
        else {
            setSelected('/auto/en')
        }
    }, [])

    const langChange = (e, m, evt) => {
        evt.preventDefault()
        if (hasCookie('googtrans')) {
            setCookie('googtrans', decodeURI(e))
            setSelected(e)
        }
        else {
            setCookie('googtrans', e)
            setSelected(e)
        }
        window.location.reload()
    }

    const googleTranslateElementInit = () => {

        new window.google.translate.TranslateElement({
            pageLanguage: 'auto',
            autoDisplay: false,
            includedLanguages: "hi,en,mr, gu", // If you remove it, by default all google supported language will be included
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
            'google_translate_element');
    }

    return (
        <>

            <div id="google_translate_element" ></div>

            {/* <SelectPicker
                data={languages}
                style={{ width: 100 }}
                placement="bottomEnd"
                cleanable={false}
                value={selected}
                searchable={false}
                className={'notranslate'}
                menuClassName={'notranslate'}
                onSelect={(e, m, evt) => langChange(e, m, evt)}
                placeholder="Lang" /> */}
        </>
    )
}

export default GoogleTranslate
