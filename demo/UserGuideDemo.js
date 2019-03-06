/**
 * UserGuide Component Demo for uxcore
 * @author buzhou
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const UserGuide = require('../src').getWithKey('1', {
  blocked: false,
  skipType: 'NO_REMIND',
});

const Step1 = UserGuide.addUserGuide({
  dom: 'button',
  step: 1,
  title: '我是第一步提示',
  content: '这是一段说明文字，用来补充描述内容',
  iconName: 'shanchu',
  contentType: 'TEXT',
  type: 'ReactComponent',
});

UserGuide.addUserGuide({
  step: 2,
  title: '我是第二步的提示，指定了DIV和图片',
  contentType: 'IMAGE',
  content: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532967222590&di=18571ba9affc82987a08966098a75b26&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F267f9e2f07082838304837cfb499a9014d08f1a0.jpg',
  type: 'HTMLElementMaker',
  getDom() {
    return document.getElementById('justTestIt');
  },
});

UserGuide.addUserGuide({
  step: 3,
  title: '我是第三步的提示，我也没有对应的DOM，指定了视频',
  contentType: 'VIDEO',
  content: 'http://techslides.com/demos/sample-videos/small.mp4',
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532968252286&di=702ee1cb712c50b7f41ba87ac6707737&imgtype=0&src=http%3A%2F%2Fp0.qhimgs4.com%2Ft01383c80228884eb05.jpg',
});

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Step1 onClick={() => UserGuide.start()}>测试的按钮</Step1>
        <div id="justTestIt">我是一个测试holder</div>
      </div>
    );
  }
}

module.exports = Demo;
