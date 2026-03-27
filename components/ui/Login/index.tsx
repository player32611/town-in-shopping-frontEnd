import { useState } from "react";
import { postUserLogin, postUserRegister } from "@/services/user";
import { useMessageStore } from "@/store/messageStore";

import type { FormItemProps, FormProps } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Modal } from "antd";

const formItemLayout: FormProps = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

const tailFormItemLayout: FormItemProps = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

export default function Login(props: { isModalOpen: boolean; handleClose: () => void }) {
	const [modalType, setModalType] = useState<"login" | "register">("login");
	const [form] = Form.useForm();
	const { messageSuccess, messageError } = useMessageStore();

	const handleLogin = (values: { name: string; password: string; remember: boolean }) => {
		postUserLogin({ name: values.name, password: values.password }).then(res => {
			if (res) {
				console.log(res);
				messageSuccess("登录成功");
				localStorage.setItem("name", res.name);
				localStorage.setItem("avatar", res.avatar);
				localStorage.setItem("roleId", res.roleId);
				props.handleClose();
				window.location.reload();
			} else {
				messageError("登录失败");
			}
		});
	};

	const handleRegister = (values: { name: string; password: string }) => {
		postUserRegister({ name: values.name, password: values.password }).then(res => {
			if (res) {
				console.log(res);
				messageSuccess("注册成功");
				localStorage.setItem("name", res.name);
				localStorage.setItem("avatar", res.avatar);
				localStorage.setItem("roleId", res.roleId);
				props.handleClose();
				window.location.reload();
			} else {
				messageError("注册失败");
			}
		});
	};

	return (
		<>
			<Modal
				open={props.isModalOpen}
				closable={{ "aria-label": "Custom Close Button" }}
				onCancel={props.handleClose}
				footer={null}
			>
				{modalType === "login" ? (
					<Form
						name="login"
						initialValues={{ remember: true }}
						style={{ marginTop: "46px", width: "100%" }}
						onFinish={handleLogin}
					>
						<Form.Item name="name" rules={[{ required: true, message: "请输入昵称!" }]}>
							<Input prefix={<UserOutlined />} placeholder="昵称" />
						</Form.Item>
						<Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
							<Input prefix={<LockOutlined />} type="password" placeholder="密码" />
						</Form.Item>
						<Form.Item>
							<Flex justify="space-between" align="center">
								<Form.Item name="remember" valuePropName="checked" noStyle>
									<Checkbox>记住我</Checkbox>
								</Form.Item>
								<a>忘记密码?</a>
							</Flex>
						</Form.Item>
						<Form.Item>
							<Button block type="primary" htmlType="submit">
								登录
							</Button>
							或者 <a onClick={() => setModalType("register")}>现在注册!</a>
						</Form.Item>
					</Form>
				) : (
					<Form
						{...formItemLayout}
						form={form}
						name="register"
						style={{ marginTop: "46px", maxWidth: 600 }}
						onFinish={handleRegister}
					>
						<Form.Item
							name="name"
							label="昵称"
							tooltip="其他人如何称呼您？"
							rules={[{ required: true, message: "请输入昵称!", whitespace: true }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="email"
							label="邮箱"
							rules={[
								{
									type: "email",
									message: "不是有效的邮箱",
								},
								{
									required: true,
									message: "请输入邮箱!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="password"
							label="密码"
							rules={[
								{
									required: true,
									message: "请输入密码！",
								},
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name="confirm"
							label="确认密码"
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
									message: "请确认密码",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("两次输入的密码不一致!"));
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							name="agreement"
							valuePropName="checked"
							rules={[
								{
									validator: (_, value) =>
										value ? Promise.resolve() : Promise.reject(new Error("需要同意用户协议")),
								},
							]}
							{...tailFormItemLayout}
						>
							<Checkbox>
								同意 <a>用户协议</a>
							</Checkbox>
						</Form.Item>
						<Form.Item {...tailFormItemLayout}>
							<Button block type="primary" htmlType="submit">
								注册
							</Button>
							已有账号？ <a onClick={() => setModalType("login")}>现在登录!</a>
						</Form.Item>
					</Form>
				)}
			</Modal>
		</>
	);
}
