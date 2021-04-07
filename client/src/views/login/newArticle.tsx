/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import { Menu, Dropdown, Button } from "antd";
import "antd/dist/antd.css";
import "./options.css";
import { Form, Input, Button } from "antd";
import axios from "axios";
import moment from "moment";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
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

const NewArticle: React.FC<Record<string, never>> = () => {
  const [form] = Form.useForm();

  let author_id: string;
  let topic_id: string;

  const onFinish = (values: any) => {
    axios
      .get("http://localhost:5000/learn/authors")
      .then((res) => {
        const name = values.author;
        const iteratedData = res.data;
        for (const element of iteratedData) {
          if (element.name == name) {
            author_id = element._id;
          }
        }
        if (author_id == null) {
          // throw error
          throw "No User Found";
        }
      })
      .then(() => {
        axios
        .get("http://localhost:5000/learn/topics")
        .then((res) => {
          const name = values.topic;
          const iteratedData = res.data;
          for (const element of iteratedData) {
            if (element.name == name) {
              topic_id = element._id;
            }
          }
          if (topic_id == null) {
            // throw error
            throw "No Topic Found";
          }
        });
      })
      .then(() => {
        console.log(">>>>");
        console.log(author_id);
        console.log(topic_id);
        axios
          .put("http://localhost:5000/learn/article/create", {
            title: values.title,
            author: author_id,
            dateUpdated: moment().format("MM/DD/YYYY"),
            topic: topic_id,
            content: values.content,
            difficulty: values.difficulty,
          })
          .then((_response) => {
            alert("Author Saved!");
          })
          .catch((_err) => {
            alert("Something Went Wrong!");
          });
      });
  };

  return (
    <div className="centeredForm">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Enter Article Title",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[
            {
              required: true,
              message: "Enter Article Author",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="topic"
          label="Topic"
          rules={[
            {
              required: true,
              message: "Topic",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Content",
            },
          ]}
          hasFeedback
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="difficulty"
          label="Difficulty"
          rules={[
            {
              required: true,
              message: "Difficulty",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit Article
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewArticle;
