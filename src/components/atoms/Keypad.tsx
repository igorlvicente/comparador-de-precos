import * as React from 'react'
import { Button, Col, Row } from 'antd'
import { CaretLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'

type CalculatorContentProps = {
    onPress: { (new_value: string): void }
}

const keys: { value: string, label?: JSX.Element | string, type?: 'primary' | 'dashed' | undefined, danger?: boolean, colSize?: number }[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: 'X', label: <CloseOutlined/>, type: 'dashed' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '<', label: <CaretLeftOutlined/>, danger: true, type: 'primary' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: ',', label: ',' },
    { value: '0', label: '0', colSize: 18 },
    { value: 'OK', type: 'primary', label: <CheckOutlined/> },
]

const Keypad: React.FC<CalculatorContentProps> = (props) => {
    const onPress = (value: string) => {
        props.onPress(value)
    }

    return (
        <Row gutter={8} style={{ width: '250px', height: '300px' }}>
            {
                keys.map(key => (
                    <Col
                        xs={key.colSize || 6}
                        sm={key.colSize || 6}
                        md={key.colSize || 6}
                        lg={key.colSize || 6}
                        xl={key.colSize || 6}
                        xxl={key.colSize || 6}
                        key={key.value}
                    >
                        <Button
                            block
                            size="large"
                            onClick={() => onPress(key.value)}
                            type={key.type}
                            danger={key.danger}
                        >
                            {key.label}
                        </Button>
                    </Col>
                ))
            }
        </Row>
    )
}

export default Keypad