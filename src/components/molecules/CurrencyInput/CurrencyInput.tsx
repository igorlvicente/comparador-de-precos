import * as React from 'react'
import { Input, Popover } from 'antd'
import { useEffect, useState } from 'react'
import Keypad from '../../atoms/Keypad'

type CalculatorInputProps = {
    onChange?: { (newValue: number): void },
    value?: number,
}

const parseNumber = (value: string): number => {
    const [precision, scale] = value.split(',')

    const precisionString = precision || '0'
    const precisionNumber = parseInt(precisionString) * 100

    const scaleString = (scale || '0').slice(0, 2)
    const scaleNumber = parseInt(scaleString) % 100

    return precisionNumber + scaleNumber
}

const formatNumber = (value: number): string => {
    if (value === 0) {
        return '0'
    }

    const numberBeforeComma = Math.floor(value / 100)
    const numberAfterComma = Math.floor(value % 100)
    const trailingZero = numberBeforeComma < 10

    return `${numberBeforeComma},${numberAfterComma}${trailingZero ? '0' : ''}`
}

const CurrencyInput: React.FC<CalculatorInputProps> = (props) => {
    const [internalValue, setInternalValue] = useState<string>('0')
    const [keypadVisible, setKeypadVisible] = useState<boolean>(false)

    useEffect(() => {
        setInternalValue(formatNumber(props.value || 0))
    }, [props.value])

    const handlePress = (value: string) => {
        switch (value) {
            case 'OK':
                setKeypadVisible(false)
                const newValue = parseNumber(internalValue)

                if (newValue === props.value) {
                    // Se a string for diferente mas o resultado final for igual ao valor, ele não estava atualizando
                    setInternalValue(formatNumber(props.value))
                } else if (props.onChange) {
                    props.onChange(newValue)
                }
                break
            case '<':
                setInternalValue(internalValue.slice(0, -1))
                break
            case 'X':
                setInternalValue(formatNumber(props.value || 0))
                setKeypadVisible(false)
                break
            default:
                if (internalValue === '0') {
                    setInternalValue(value)
                } else {
                    setInternalValue(internalValue + value)
                }
        }
    }

    return (
        <Popover
            content={<Keypad onPress={handlePress}/>}
            trigger="click"
            visible={keypadVisible}
            onVisibleChange={visible => setKeypadVisible(visible)}
        >
            <Input
                addonBefore="R$"
                readOnly
                value={internalValue}
            />
        </Popover>
    )
}

export default CurrencyInput