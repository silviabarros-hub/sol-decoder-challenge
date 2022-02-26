import { IonIcon, IonItem, IonSearchbar, useIonAlert} from '@ionic/react';
import {KeyboardEvent, KeyboardEventHandler, useState} from 'react';
import {help, search} from 'ionicons/icons';

interface SearchBarProps {
    initialValue?: string;
    onSubmit(query: string): unknown;
    placeholder?: string;
    helpMsg?: any;
    disableReset?: any;
}

function SearchBar({initialValue, onSubmit, placeholder, helpMsg, disableReset}: SearchBarProps) {

    const handleKeyDown: KeyboardEventHandler<HTMLIonSearchbarElement> = (e) => {
        const {target, key} = e as KeyboardEvent<HTMLIonSearchbarElement> & { target: HTMLInputElement }
        if (target && key === 'Enter') {
            setSearchValue(target.value!);
            let searchVal = target.value.trim();
            onSubmit(searchVal);
        }
    };
    const [searchValue, setSearchValue] = useState(initialValue ?? '');
    const [present] = useIonAlert();

    const getHelp = async (msg: string) => {
        await present(msg, [{text: 'Ok'}]);
    }
    const resetSearch = () => {
        onSubmit('');
        setSearchValue('');
    }

    return (
        <>
            <IonSearchbar
                className="text-base !p-0 flex-grow outline-none overflow-hidden flex items-center rounded-3xl border"
                type="text"
                value={searchValue}
                onKeyPress={handleKeyDown}
                onIonChange={(e) => setSearchValue(e.detail.value!)}
                animated
                placeholder={placeholder}
            />
        </>
    );
}


export default SearchBar;
