import * as React from 'react'
import { Button, Col, Row } from 'antd'
import { CaretLeftOutlined, CheckOutlined } from '@ant-design/icons'

type CalculatorContentProps = {
    onPress: { (new_value: string): void }
}

const keys: { value: string, label?: JSX.Element | string, type?: 'primary' | undefined, danger?: boolean, colSize?: number }[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: ',', label: ',' },
    { value: '0', label: '0' },
    { value: '<', label: <CaretLeftOutlined/>, danger: true, type: 'primary' },
    { value: 'OK', type: 'primary', label: <CheckOutlined/>, colSize: 24 },
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
                        xs={key.colSize || 8}
                        sm={key.colSize || 8}
                        md={key.colSize || 8}
                        lg={key.colSize || 8}
                        xl={key.colSize || 8}
                        xxl={key.colSize || 8}
                    >
                        <Button
                            block
                            key={key.value}
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