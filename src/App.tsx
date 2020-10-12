import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { List, Space, Button, Drawer, Form, Input, Select, Row, Col, InputNumber, Affix } from 'antd'
import { PlusOutlined, EyeOutlined, TagsOutlined, TagOutlined } from '@ant-design/icons'
import { useTypedSelector } from './store/reducer'
import { ListItem } from './types/productList'
import { useDispatch } from 'react-redux'
import { PRODUCT_LIST } from './store/actionTypes'
import styled from 'styled-components'
import CurrencyInput from './components/molecules/CurrencyInput/CurrencyInput'

const App = () => {
    const dispatch = useDispatch()
    const list: any = useTypedSelector((state) => state.productList.list)
    const [addProductDrawerVisible, setAddProductDrawerVisible] = useState<boolean>(false)

    const openNewProductDrawer = () => {
        setAddProductDrawerVisible(true)
    }

    const addProductToList = (productValues: ProductFormValues) => {
        if (!productValues.id) {
            let idIsDuplicate = true

            while (idIsDuplicate) {
                productValues.id = (Math.round(Math.random() * 10000)).toString()
                const itemWithSameId = list.find((item: ListItem) => item.id === productValues.id)
                if (!itemWithSameId) {
                    idIsDuplicate = false
                }
            }
        }
        dispatch({ type: PRODUCT_LIST.ADD_ITEM, payload: productValues })
        setAddProductDrawerVisible(false)
    }

    // const removeItem = (itemId: string) => {
    //     dispatch({ type: PRODUCT_LIST.REMOVE_ITEM, payload: itemId })
    // }

    return (
        <main>
            <ProductFormDrawer
                visible={addProductDrawerVisible}
                onClose={() => setAddProductDrawerVisible(false)}
                onSubmit={addProductToList}
            />
            {
                list.length > 0 &&
                <List
                    itemLayout="vertical"
                    size="small"
                    dataSource={list}
                    renderItem={(item: ListItem) => (
                        <ListItemBody
                            key={item.name}
                        >
                                <ListItemDescription>
                                    <p className="title">{item.name}</p>
                                    <p className="cheaper-description">
                                        <TagOutlined className="price-tag-icon"/> 800g em Brasão Supermercados
                                    </p>
                                    {/*<TagsOutlined /> 800g em Brasão Supermercados</p>*/}
                                </ListItemDescription>
                                <Space>
                                    <Button icon={<EyeOutlined/>}/>
                                    <Button icon={<PlusOutlined/>}/>
                                </Space>
                        </ListItemBody>
                    )}
                />
            }

            <Affix>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={openNewProductDrawer}
                    > Adicionar produto</Button>
                </div>
            </Affix>
        </main>
    )
}

export default App

type ProductFormValues = {
    name: string,
    measurementUnit: string,
    quantity: number,
    price: number,
    id: string,
}

type ProductFormDrawerProps = {
    visible: boolean,
    onClose: { (): void },
    onSubmit: { (values: ProductFormValues): void }
}
const ProductFormDrawer: React.FC<ProductFormDrawerProps> = (props) => {
    const [form] = Form.useForm()
    const [defaultInitialValues, setDefaultInitialValues] = useState<{ measurementUnit?: string }>({})

    useEffect(() => {
        if (!props.visible) {
            form.resetFields()
        }
    }, [form, props.visible])

    const measurementUnits = [
        { id: 'mg', name: 'mg' },
        { id: 'g', name: 'g' },
        { id: 'kg', name: 'kg' },
        { id: 'ml', name: 'ml' },
        { id: 'l', name: 'l' },
        { id: 'un', name: 'un.' },
    ]

    const handleFormFinish = async () => {
        let values: ProductFormValues
        try {
            values = await form.validateFields() as ProductFormValues
        } catch {
            return
        }

        setDefaultInitialValues({ measurementUnit: values.measurementUnit })

        props.onSubmit(values)
    }

    return (

        <Form
            name="product"
            onFinish={handleFormFinish}
            form={form}
            initialValues={defaultInitialValues}
        >
            <Drawer
                title="Adicionar produto"
                placement="left"
                onClose={props.onClose}
                visible={props.visible}
                width={350}
                closable
                footer={<Row gutter={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Col><Button type="default" onClick={props.onClose}>Cancelar</Button></Col>
                    <Col><Button onClick={handleFormFinish} type="primary">Salvar</Button></Col>
                </Row>}
            >
                <Row gutter={8}>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Form.Item
                            label="Nome"
                            name="name"
                            rules={[{ required: true, message: 'Descreva seu produto!' }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item
                            label="Und."
                            name="measurementUnit"
                        >
                            <Select>
                                {
                                    measurementUnits.map(unit => (
                                        <Select.Option key={unit.id} value={unit.id}>{unit.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Quantidade (na embalagem)"
                            name="quantity"
                        >
                            <InputNumber/>
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            label="Preço"
                            name="price"
                        >
                            <CurrencyInput/>
                        </Form.Item>
                    </Col>
                </Row>
            </Drawer>
        </Form>
    )
}

const ListItemBody = styled.span`
    display: flex;
    flex-direction: row;
    margin: 8px;
    justify-content: space-between;
`

const ListItemDescription = styled.div`
    & .title {
        font-weight: bold;
        margin: 0;
    }
    
    & .price-tag-icon {
        color: green;
    }
`