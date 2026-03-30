import { useMessageStore } from "@/store/messageStore";
import { addProduct } from "@/services/product";
import { getStorageItem } from "@/lib/storage";
import type { AddProductsProps, AddProductsDetails } from "@/types/component";

import { Button, Form, Input, InputNumber, Modal } from "antd";
import type { FormProps } from "antd";

const { TextArea } = Input;

export default function AddProduct(props: AddProductsProps) {
	const { messageSuccess, messageError } = useMessageStore();

	const onFinish: FormProps<AddProductsDetails>["onFinish"] = values => {
		const userId = getStorageItem("id");
		if (!userId) {
			messageError("请先登录");
			return;
		}
		addProduct({ ...values, userId })
			.then(() => {
				messageSuccess("添加成功");
				props.handleClose();
				props.refresh();
			})
			.catch(() => {
				messageError("添加失败");
			});
	};

	return (
		<Modal open={props.isOpen} title="添加商品" onCancel={props.handleClose} footer={null}>
			<Form
				name="addProduct"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 20 }}
				style={{ maxWidth: 600 }}
				onFinish={onFinish}
				autoComplete="on"
			>
				<Form.Item<AddProductsDetails>
					label="商品名称"
					name="name"
					rules={[{ required: true, message: "请输入商品名称!" }]}
				>
					<Input showCount maxLength={50} />
				</Form.Item>

				<Form.Item<AddProductsDetails>
					label="价格"
					name="price"
					rules={[{ required: true, message: "请输入商品价格!" }]}
				>
					<InputNumber<number>
						min={0}
						formatter={value => `${value}￥`}
						parser={value => value?.replace("￥", "") as unknown as number}
						style={{
							display: "block",
						}}
					/>
				</Form.Item>

				<Form.Item<AddProductsDetails>
					label="图片链接"
					name="picture"
					rules={[{ required: true, message: "请输入图片链接!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<AddProductsDetails>
					label="库存"
					name="num"
					rules={[{ required: true, message: "请输入库存!" }]}
				>
					<InputNumber<number>
						min={0}
						formatter={value => `${value}件`}
						parser={value => value?.replace("件", "") as unknown as number}
						style={{
							display: "block",
						}}
					/>
				</Form.Item>

				<Form.Item<AddProductsDetails>
					label="详情信息"
					name="details"
					rules={[{ required: true, message: "请输入详情信息!" }]}
				>
					<TextArea
						showCount
						maxLength={200}
						rows={4}
						style={{
							resize: "none",
						}}
					/>
				</Form.Item>

				<Form.Item label={null}>
					<Button type="primary" htmlType="submit" block>
						上架
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
