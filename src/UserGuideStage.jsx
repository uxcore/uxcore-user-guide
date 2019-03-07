/*
 * @Author: tongbin.xtb
 * @Date: 2018-01-03 17:34:28
 * @Last Modified by: tongbin.xtb
 * @Last Modified time: 2018-02-24 19:32:32
 */

import React from 'react';
import PropTypes from 'prop-types';
import scrollToTop from './scrollToTop';
import Tooltip from 'uxcore-tooltip';
import Button from 'uxcore-button';
import Icon from 'uxcore-icon';
import CheckboxGroup from 'uxcore-checkbox-group';

const texts = {
  'zh-cn': {
    done: '我知道了',
    final: '立即体验',
    next: '下一步',
    prev: '上一步',
    skip: '跳过',
    learnMore: '了解更多',
    noRemind: '不再提醒',
  },
  'en-us': {
    done: 'Got it',
    next: 'next',
    final: 'Getting started',
    skip: 'Skip',
    learnMore: 'Learn more',
    noRemind: 'Do not remind',
  },
};

class UserGuideStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      skipChecked: props.skipChecked || false,
    };
  }
  componentDidMount() {
    this.nextStep(-1);
  }
  getDom(s) {
    if (!s) {
      return null;
    }
    let dom = s.dom;
    if (s.type === 'HTMLElement' || s.type === 'HTMLElementMaker' || s.type === 'ReactComponent') {
      if (s.type === 'HTMLElementMaker') {
        if (typeof s.dom === 'function') {
          dom = s.dom();
        }
      }
      if (!(dom instanceof HTMLElement)) {
        return null;
      }
    }
    return dom;
  }
  getCenter(s) {
    let center = {};
    if (s.type === 'HTMLElement' || s.type === 'HTMLElementMaker' || s.type === 'ReactComponent') {
      let dom = s.dom;
      if (s.type === 'HTMLElementMaker') {
        if (typeof s.getDom === 'function') {
          dom = s.getDom();
        }
      }
      if (!(dom instanceof HTMLElement)) {
        return {
          x: 0, y: 0, w: 0, h: 0,
        };
      }
      const { top, left, width: w, height: h } = dom.getBoundingClientRect();
      center = {
        x: left + w / 2,
        y: top + h / 2,
        w,
        h,
      };
      center.y += window.scrollY;
    }
    return center;
  }
  nextStep(index) {
    if (this.props.designMode) {
      return;
    }
    let center = { x: 0, y: 0 };
    if (this.props.steps[index + 1]) {
      center = this.getCenter(this.props.steps[index + 1]);
    }
    let to;
    let height = center.h;
    if (center.x - 319 - center.w / 2 < 0) {
      height += 200;
    }
    const { innerHeight } = window;
    if (innerHeight > height) {
      to = center.y - center.h / 2 - (innerHeight - height) / 2;
    } else {
      to = center.y - center.h / 2 + height - innerHeight;
    }
    if (to < 0) {
      to = 0;
    }
    scrollToTop(to);
    this.setState({
      currentStep: index + 1,
    }, () => {
      if (this.state.currentStep >= this.props.steps.length) {
        this.props.done();
      }
    });
  }
  handleNoMindChange() {
    this.setState({
      skipChecked: !this.state.skipChecked,
    }, () => {
      this.props.onAssistClick(this.props.steps[this.state.currentStep]);
    });
  }
  renderSkipText() {
    switch (this.props.assistType) {
      case 'SKIP':
        return (<span
          role="button"
          className={`${this.props.prefixCls}-skip-text`}
          onClick={() => this.nextStep(this.props.steps.length - 1)}
        >
          {texts[this.props.locale].skip}
        </span>);
      case 'LEARN_MORE':
        return (<span
          role="button"
          className={`${this.props.prefixCls}-skip-text`}
          onClick={() => this.props.onAssistClick(this.props.steps[this.state.currentStep])}
        >
          {texts[this.props.locale].learnMore}
        </span>);
      case 'NO_REMIND':
        return (<CheckboxGroup
          value={[this.state.skipChecked ? '1' : '0']}
          onChange={this.handleNoMindChange.bind(this)}
          className={`${this.props.prefixCls}-skip-checkbox`}
        >
          <CheckboxGroup.Item text={texts[this.props.locale].noRemind} value="1" />
        </CheckboxGroup>);
      default:
        return undefined;
    }
  }
  render() {
    const last = this.props.steps.length - 1;
    const multple = this.props.steps.length > 1;
    const finalText = this.props.finalText || (multple ?
      texts[this.props.locale].final : texts[this.props.locale].done);
    return (<div className={`${this.props.prefixCls}-holder`}>
      {this.props.steps.map((s, index) => {
        const center = this.getCenter(s);
        const visible = (this.state.currentStep === index) || this.props.designMode;
        const hint = (
          <div
            className={`${this.props.prefixCls}-step-hint`}
          >
            <div className={`${this.props.prefixCls}-step-hint-wrp`}>
              {s.iconName && (<Icon
                name={s.iconName}
                className={`${this.props.prefixCls}-step-hint-icon`}
              />)}
              <div>
                {s.title && <div className={`${this.props.prefixCls}-step-hint-title`}>
                  {s.title}
                </div>}
                {!s.contentType || s.contentType === 'TEXT' && (
                  <div className={`${this.props.prefixCls}-step-hint-desc`}>{s.content}</div>
                )}
                {s.contentType === 'IMAGE' && (
                  <div className={`${this.props.prefixCls}-step-hint-desc`}>
                    <img role="presentation" src={s.content} />
                  </div>
                )}
                {s.contentType === 'VIDEO' && (
                  <div className={`${this.props.prefixCls}-step-hint-desc`}>
                    <video
                      controls="true"
                      src={s.content}
                      poster={s.poster}
                      preload="auto"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={`${this.props.prefixCls}-hint-bottom`}>
              {this.renderSkipText()}
              <Button
                type="primary"
                size="small"
                onClick={() => { this.nextStep(index); }}
              >
                {index === last ? finalText : texts[this.props.locale].next}
              </Button>
              {
                index > 0 &&
                (<Button
                  type="secondary"
                  size="small"
                  onClick={() => { this.nextStep(index - 2); }}
                >
                  {texts[this.props.locale].prev}
                </Button>)
              }
            </div>
          </div>);
        return (<Tooltip
          overlay={hint}
          placement="bottomRight"
          trigger={['click']}
          visible={visible}
          overlayClassName={`${this.props.prefixCls}-stage-step-hint`}
          key={s.step}
        >
          <div
            key={s.step}
            className={`${this.props.prefixCls}-breathing-point${visible ? ''
              : ` ${this.props.prefixCls}-hidden`}`}
            style={{
              top: (center.y + center.h / 2 - 20) || 0,
              left: (center.x + center.w / 2 - 20) || 0,
            }}
          >
            <div className={`${this.props.prefixCls}-big`}></div>
            <div className={`${this.props.prefixCls}-small`}></div>
          </div>
        </Tooltip>);
      })}
    </div>);
  }
}

UserGuideStage.defaultProps = {
  steps: [],
  done: () => {},
  locale: 'zh-cn',
  designMode: false,
  prefixCls: 'kuma-user-guide',
  assistType: undefined,
  onAssistClick: () => {},
  skipChecked: false,
};

UserGuideStage.propTypes = {
  steps: PropTypes.array,
  done: PropTypes.func,
  locale: PropTypes.string,
  finalText: PropTypes.string,
  designMode: PropTypes.bool,
  prefixCls: PropTypes.string,
  assistType: PropTypes.string,
  onAssistClick: PropTypes.func,
  skipChecked: PropTypes.bool,
};

UserGuideStage.displayName = 'UserGuideStage';

module.exports = UserGuideStage;
