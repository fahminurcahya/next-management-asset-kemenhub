"use client"

import { useMemo } from "react"
import { SingleValue } from 'react-select';
import SingleSelect from 'react-select';
import CreateableSelect from 'react-select/creatable';



type Props = {
    onChange: (value?: string) => void
    onCreate?: (value: string) => void
    options?: { label: string, value: string }[]
    value?: string | number | null | undefined;
    disabled?: boolean;
    isLoading?: boolean;
    placeholder?: string;
    isDocumentBody?: boolean
    handleChange?: (value?: string) => void
}

export const Select = ({
    value,
    onChange,
    disabled,
    isLoading = false,
    onCreate,
    handleChange,
    options = [],
    isDocumentBody,
    placeholder
}: Props) => {
    const onSelect = (
        option: SingleValue<{ label: string, value: string }>
    ) => {
        onChange(option?.value);
        if (handleChange) {
            handleChange(option?.value)
        }
    }

    const formattedValue = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value]);


    if (onCreate) {
        return (
            <CreateableSelect
                placeholder={placeholder}
                className="text-sm h-10"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderColor: "#e2e8f0",
                        ":hover": {
                            borderColor: "e2e8f0"
                        }
                    })
                }}
                value={formattedValue}
                onChange={onSelect}
                options={options}
                onCreateOption={onCreate}
                isDisabled={disabled}
            />
        )
    }

    return (
        <SingleSelect
            placeholder={placeholder}
            className="text-sm h-10 "
            menuPortalTarget={isDocumentBody ? document.body : null}
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8f0",
                    ":hover": {
                        borderColor: "e2e8f0"
                    },
                })
            }}
            value={formattedValue}
            isLoading={isLoading}
            onChange={onSelect}
            options={options}
            isDisabled={disabled}
        />
    )
}