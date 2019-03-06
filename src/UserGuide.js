/**
 * UserGuide Component for uxcore
 * @author buzhou
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const UserGuideStage = require('./UserGuideStage');
const scrollToTop = require('./scrollToTop');

const guideMap = {};

// HOC, 不是一个react component
export default class UserGuide {
  constructor(key, config) {
    this.key = key;
    this.locale = config && config.locale || 'zh-cn';
    this.useImg = config && config.useImage || false;
    this.prefixCls = config && config.prefixCls || 'kuma-user-guide';
    this.className = config && config.className || '';
    // 默认 true,
    this.blocked = config && config.blocked;
    if (this.blocked === undefined) {
      this.blocked = true;
    }
    this.skipType = config && config.skipType;
    this.onSkipClick = config && config.onSkipClick;
    this.onComplete = config && config.onComplete;
  }
  addUserGuide(guideProps) {
    const { step = 0 } = guideProps;
    if (!this.steps) {
      this.steps = [];
    }
    this.steps[step] = guideProps || {};
    // if (WrappedComponent instanceof HTMLElement) {
    //   this.steps[step].dom = WrappedComponent;
    //   return WrappedComponent;
    // }
    if (guideProps.type === 'ReactComponent') {
      return (props) => <guideProps.dom
        {...props}
        ref={(comp) => {
          this.steps[step].dom = comp;
        }}
      />;
    }
    return false;
  }
  start(designMode) {
    // key must specified
    const steps = (this.steps || []).filter(i => i);
    const dom = document.createElement('div');
    dom.className = `${this.prefixCls}-stage${designMode ? ' design-mode' : ''}${this.className ?
      ` ${this.className}` : ''}${this.blocked ? ' blocked' : ''}`;
    document.body.appendChild(dom);
    const overflow = document.body.style.overflowY;
    if (this.blocked) {
      document.body.style.overflowY = 'hidden';
    }
    scrollToTop(0);
    this.stop = function stop() {
      document.body.removeChild(dom);
      document.body.style.overflowY = overflow;
      this.drop();
      if (typeof this.onComplete === 'function') {
        this.onComplete();
      }
    };
    ReactDOM.render(<UserGuideStage
      steps={steps}
      skipType={this.skipType}
      onSkipClick={this.onSkipClick}
      locale={this.locale}
      prefixCls={this.prefixCls}
      className={this.className}
      done={() => this.stop()}
      designMode={designMode}
    />, dom);
  }
  drop() {
    delete guideMap[this.key];
  }
}

UserGuide.getWithKey = function getWithKey(key, config) {
  if (guideMap[key]) {
    return guideMap[key];
  }
  guideMap[key] = new UserGuide(key, config);
  return guideMap[key];
};

module.exports = UserGuide;
