/**
 * AitoUserGuide Component for uxcore
 * @author buzhou
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const AitoUserGuideStage = require('./AitoUserGuideStage');
const scrollToTop = require('./scrollToTop');

const guideMap = {};

// HOC, 不是一个react component
export default class AitoUserGuide {
  constructor(key, config) {
    this.key = key;
    this.locale = config && config.locale || 'zh-cn';
    this.useImg = config && config.useImage || false;
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
    dom.className = `aito-user-guide-stage${designMode ? ' design-mode' : ''}`;
    document.body.appendChild(dom);
    const overflow = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';
    scrollToTop(0);
    ReactDOM.render(<AitoUserGuideStage
      steps={steps}
      locale={this.locale}
      done={() => {
        document.body.removeChild(dom);
        document.body.style.overflowY = overflow;
        this.drop();
        if (typeof this.onComplete === 'function') {
          this.onComplete();
        }
      }}
      designMode={designMode}
    />, dom);
  }
  drop() {
    delete guideMap[this.key];
  }
}

AitoUserGuide.getWithKey = function getWithKey(key, config) {
  if (guideMap[key]) {
    return guideMap[key];
  }
  guideMap[key] = new AitoUserGuide(key, config);
  return guideMap[key];
};

module.exports = AitoUserGuide;
