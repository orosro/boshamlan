import './styles.css'

interface Option {
    id: string | number;
    label: string;
    count?: number;
}

interface FormControlSelectProps {
    options: Option[];
    selectedOptions: Option[];
    onChange: (selected: Option[]) => void;
    placeholder?: string;
    className?: string;
}

function createPill(option: Option, onRemove: (option: Option, pill: HTMLElement) => void): HTMLElement {
    const pill = document.createElement('div');
    pill.className = "flex ps-2 items-center justify-center rounded-full max-w-full overflow-hidden bg-primary-light border border-accent-primary-light text-primary-main cursor-auto h-10";
    pill.setAttribute('data-selected-option-id', option.id.toString());
    pill.setAttribute('title', option.label);

    const span = document.createElement('span');
    span.textContent = option.label;
    pill.appendChild(span);

    const removeButton = document.createElement('button');
    removeButton.className = "p-2 bg-red";
    removeButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.39027 8.51127C9.41951 8.54027 9.44271 8.57478 9.45855 8.61279C9.47438 8.65081 9.48254 8.69159 9.48254 8.73277C9.48254 8.77395 9.47438 8.81473 9.45855 8.85274C9.44271 8.89076 9.41951 8.92527 9.39027 8.95427L8.95327 9.39127C8.92427 9.42051 8.88976 9.44371 8.85174 9.45955C8.81373 9.47538 8.77295 9.48354 8.73177 9.48354C8.69059 9.48354 8.64981 9.47538 8.61179 9.45955C8.57378 9.44371 8.53927 9.42051 8.51027 9.39127L5.74127 6.62127L2.97227 9.39027C2.94327 9.41951 2.90876 9.44271 2.87074 9.45855C2.83273 9.47438 2.79195 9.48254 2.75077 9.48254C2.70959 9.48254 2.66881 9.47438 2.63079 9.45855C2.59278 9.44271 2.55827 9.41951 2.52927 9.39027L2.09227 8.95327C2.06303 8.92427 2.03983 8.88976 2.02399 8.85174C2.00815 8.81373 2 8.77295 2 8.73177C2 8.69059 2.00815 8.64981 2.02399 8.61179C2.03983 8.57378 2.06303 8.53927 2.09227 8.51027L4.86227 5.74127L2.09227 2.97227C2.06303 2.94327 2.03983 2.90876 2.02399 2.87074C2.00815 2.83273 2 2.79195 2 2.75077C2 2.70959 2.00815 2.66881 2.02399 2.63079C2.03983 2.59278 2.06303 2.55827 2.09227 2.52927L2.52927 2.09227C2.55827 2.06303 2.59278 2.03983 2.63079 2.02399C2.66881 2.00815 2.70959 2 2.75077 2C2.79195 2 2.83273 2.00815 2.87074 2.02399C2.90876 2.03983 2.94327 2.06303 2.97227 2.09227L5.74127 4.86227L8.51127 2.09227C8.54027 2.06303 8.57478 2.03983 8.61279 2.02399C8.65081 2.00815 8.69159 2 8.73277 2C8.77395 2 8.81473 2.00815 8.85274 2.02399C8.89076 2.03983 8.92527 2.06303 8.95427 2.09227L9.39027 2.52927C9.41951 2.55827 9.44271 2.59278 9.45855 2.63079C9.47438 2.66881 9.48254 2.70959 9.48254 2.75077C9.48254 2.79195 9.47438 2.83273 9.45855 2.87074C9.44271 2.90876 9.41951 2.94327 9.39027 2.97227L6.62127 5.74127L9.39027 8.51127Z" fill="#2E6190"/>
    </svg>`;

    removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        onRemove(option, pill);
    });

    pill.appendChild(removeButton);
    return pill;
}

function createFormControlSelect({
    options,
    selectedOptions,
    onChange,
    placeholder = "اكتب البحث هنا",
    className = ""
}: FormControlSelectProps): HTMLElement {
    const formControl = document.createElement('div');
    formControl.className = "formControl_combobox mb-4";

    // Create the input container
    const inputContainer = document.createElement('div');
    inputContainer.className = "flex justify-items-stretch w-full px-3 py-2 border border-ds-stroke rounded-[40px] focus-within:border-transparent focus-within:ring-2 focus-within:ring-primary-main color-fnt-blue";

      // create the inner wrapper for the input and pills
      const innerWrapper = document.createElement('div');
      innerWrapper.className = "flex grow gap-1.5 flex-wrap min-h-8";

    // Add selected options as pills
    selectedOptions.forEach(option => {
        const pill = createPill(option, (optionToRemove, pillElement) => {
            const newSelected = selectedOptions.filter(opt => opt.id !== optionToRemove.id);
            onChange(newSelected);
            pillElement.remove();
        });
        innerWrapper.prepend(pill);
    });

    // Create search input
    const input = document.createElement('input');
    input.id = 'search';
    input.type = 'text';
    input.className = "outline-none grow ml-2";
    input.placeholder = placeholder;
    input.setAttribute('autocomplete', 'off');

    // Filter options on input change
    input.addEventListener('input', (e) => {
        const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
        const listItems = ul.querySelectorAll('li');
        
        listItems.forEach(li => {
            const label = li.querySelector('label')?.textContent?.toLowerCase() || '';
            if (label.includes(searchTerm)) {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        });
    });

    // Create search icon
    const searchIcon = document.createElement('div');
    searchIcon.className = "flex items-center ms-auto";
    searchIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>`;

    // Create select list
    const selectList = document.createElement('div');
    selectList.className = "relative selectList";

    const selectListPaper = document.createElement('div');
    selectListPaper.className = "bg-white w-full p-3 rounded-[12px] absolute shadow-popover top-[16px]";
    selectListPaper.style.display = 'none';  // Hide by default

    const selectListInner = document.createElement('div');
    selectListInner.className = "max-h-[300px] overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full";

    const ul = document.createElement('ul');
    options.forEach(option => { 
        const li = document.createElement('li');
        li.className = "h-[39px] flex flex-row justify-between items-center px-3 has-[input:checked]:bg-primary-light hover:bg-primary-light";
        li.innerHTML = `
            <div class="flex items-center gap-2">
                <input type="checkbox" id="${option.id}" ${selectedOptions.some(opt => opt.id === option.id) ? 'checked' : ''}>
                <label for="${option.id}" class="cursor-pointer">${option.label}</label>
            </div>
            ${option.count ? `<div class="text-gray-500">(${option.count})</div>` : ''}
        `;

        li.addEventListener('click', () => {
            const checkbox = li.querySelector('input') as HTMLInputElement;
            checkbox.click()
        });
        // Handle enter key press for selection
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const checkbox = li.querySelector('input') as HTMLInputElement;
                checkbox.click();
            }
        });

        const checkbox = li.querySelector('input') as HTMLInputElement;
        checkbox.addEventListener('change', () => {
            const newSelected = checkbox.checked
                ? [...selectedOptions, option]
                : selectedOptions.filter(opt => opt.id !== option.id);

            checkbox.checked = newSelected.includes(option);

            if (checkbox.checked) {
                const pill = createPill(option, (optionToRemove, pillElement) => {
                    checkbox.checked = false;
                    const newSelected = selectedOptions.filter(opt => opt.id !== optionToRemove.id);
                    onChange(newSelected);
                    pillElement.remove();
                });
                innerWrapper.prepend(pill);
            } else {
                const existingPill = innerWrapper.querySelector(`[data-selected-option-id="${option.id}"]`);
                if (existingPill) {
                    innerWrapper.removeChild(existingPill);
                }
            }
            onChange(newSelected);
        });

        ul.appendChild(li);
    });

    // Assemble the component following the exact HTML structure    
    innerWrapper.appendChild(input);

    inputContainer.appendChild(innerWrapper);
    inputContainer.appendChild(searchIcon);
    
    formControl.appendChild(inputContainer);

    selectListInner.appendChild(ul);
    selectListPaper.appendChild(selectListInner);
    selectList.appendChild(selectListPaper);
    formControl.appendChild(selectList);

    // Add event listeners for toggle
    let isClicking = false;  // Declare the variable

    input.addEventListener('mousedown', () => {
        isClicking = true;
    });

    input.addEventListener('mouseup', () => {
        isClicking = false;
    });

    input.addEventListener('click', (e) => {
        if (!isClicking) {
            e.stopPropagation();
            selectListPaper.style.display = selectListPaper.style.display === 'none' ? 'block' : 'none';
        }
    });

    input.addEventListener('focus', (e) => {
        if (!isClicking) {
            e.stopPropagation();
            selectListPaper.style.display = selectListPaper.style.display === 'none' ? 'block' : 'none';
        }
    });
    // Close selectList on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            selectListPaper.style.display = 'none';
        }
    });

    // And ensure the outside click handler closes it
    document.addEventListener('click', (e) => {
        const target = e.target as Node;
        if (!formControl.contains(target)) {
            selectListPaper.style.display = 'none';
        }
    });

    return formControl;
}

// Example usage:
const options = [
    { id: 1, label: 'السالمية', count: 95 },
    { id: 2, label: 'السلام', count: 66 },
    { id: 3, label: 'سلوى', count: 66 },
    { id: 4, label: 'الزهراء', count: 65 },
    { id: 5, label: 'الجابرية', count: 64 },
    { id: 6, label: 'حولي', count: 63 },
    { id: 7, label: 'الفروانية', count: 62 },
    { id: 8, label: 'الفحيحيل', count: 61 },
    { id: 9, label: 'المنقف', count: 60 },
    { id: 10, label: 'صباح السالم', count: 59 },
    { id: 11, label: 'العقيلة', count: 58 },
    { id: 12, label: 'الرقعي', count: 57 },
    { id: 13, label: 'خيطان', count: 56 },
    { id: 14, label: 'الشعب', count: 55 },
    { id: 15, label: 'الرميثية', count: 54 },
    { id: 16, label: 'الأندلس', count: 53 },
    { id: 17, label: 'القرين', count: 52 },
    { id: 18, label: 'العارضية', count: 51 },
    { id: 19, label: 'جليب الشيوخ', count: 50 },
    { id: 20, label: 'الصباحية', count: 49 },
    { id: 20, label: 'option', count: 49 }
];

const selectedOptions: Option[] = [];

function handleSelection(selected: Option[]) {
    console.log('Selected options:', selected);
}

const formControlSelect = createFormControlSelect({
    options,
    selectedOptions,
    onChange: handleSelection,
    placeholder: 'اكتب البحث هنا'
});

// Add to the DOM
document.querySelector('.searchInput')?.appendChild(formControlSelect);
