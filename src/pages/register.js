import styles from './login.css'
import React from 'react'
import {
    Row, Col, Form, Icon, Input, Button,message
} from 'antd'
import {signUp} from '@/api/userApi'
console.log(signUp)
class resigter extends React.PureComponent {
    
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <div className = {styles.pagelogin}>  
        <Row type="flex" align="middle" className={styles.loginrow}>
            <Col span={8} offset={8}>
            <Form onSubmit={this.handleSubmit} className={styles.loginForm}> 
                <Form.Item>
                {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.loginformbutton}>
                Reigster
              </Button>
                </Form.Item>
            </Form>
            </Col>
        </Row>
            </div>
        )
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            if(!err){
                
                signUp(values).then(response => {
                    const {data} = response
                    console.log(data)
                    console.log(values)
                    if(data.code===0){
                        message.success('正确',3,()=>{
                            this.props.history.push('/login')
                        })
                    }else{
                        message.error(data.msg)
                    }
                })
            }
        })
    }
}
export default Form.create()(resigter)