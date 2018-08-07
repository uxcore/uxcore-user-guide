/*
 * @Author: tongbin.xtb
 * @Date: 2018-01-03 17:34:28
 * @Last Modified by: tongbin.xtb
 * @Last Modified time: 2018-02-24 19:32:32
 */

const React = require('react');
const PropTypes = require('prop-types');
const scrollToTop = require('./scrollToTop');
import Tooltip from 'uxcore/lib/Tooltip';

const texts = {
  'zh-cn': {
    done: '我知道了',
    final: '立即体验',
    next: '下一步',
    prev: '上一步',
    skip: '跳过引导',
  },
  'en-us': {
    done: 'Got it',
    next: 'next',
    final: 'Getting started',
    skip: 'Skip',
  },
};

const LEFT_ARROW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABKBAMAAAC7nzwcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTNnZ2cPDw8vLy8PDw8PDw8PDw8TExMTExMXFxcPDw8XFxcTExMTExMLCwmBpOCIAAAAOdFJOUwAGxxLxlt5nfyWtNERVIw6LxwAAAepJREFUSMdjYCAfWCwmWYuE30tStYjnPdpAohbevEcHSNTCo/fsAolauPWeFZKohXPdk0YStTDHPWkmNci43gWTHDMcjxjYSfUOs98BkyeRJGrqU5DVe6crgFPefJEWhjvE3jJwh7xznYArJvzevXuGLsn+TICBuegdrpTAmFSzI88TXTSvAEhs9cOVFAwYGIQeoTv9XiI4mQrgCSewsciA6QWciStx3wtAT6JPDGCsZ8U40heGiF4DLE/4PVmD6iicDt7nDGPJrnuXgRyuHDk4k9xThCPa3r26iJAReY0zN7xDMvvUu8cITp0CzrCMQw4WcyTOugKceqww4nMvJCj9oA4QICbhrnvUA1TH+Qya5tKJ0VP07p1T+EaeR5BoW/fIgBhNMk3v3r2b/oqBYc/1IL93gUTmK5tSFQlgqsoDZgUSCgxGDqCeqKU9BqRkYfanpFcWvBkMo2BQg6Oka2HMu0C6JjyZGycQe05GintiQLomvQDS9Ux5S7oe9icTSNe0TpF0PWavSNfD6UFG8jEYfjmCW4B0PVuUSdez7dkGkvUw67mTbpEoGQ1DhpJnB0hPQXpPSQ87iXeJZIQdGRmWkY5plZGMfM7+lHQHsr7zIF3TLHI07cLdEMen6RXpmqa+ayA98KaSFbkAI9OEBJ8okNsAAAAASUVORK5CYII='; // eslint-disable-line

const RIGHT_ARROW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABKBAMAAAC7nzwcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTM7OzsfHx8PDw8TExMPDw8PDw8XFxcPDw8TExMPDw8TExMPDw8PDw8LCwqdnTr8AAAAOdFJOUwAMIN5r8ZQ0zEaBWbqn+68bwwAAAeRJREFUSMdjYKApkF1Iuh69p44k62E/99iBZE2cfY83kKyJ2+7FBJI1sdi9KSBZk1TcWwUyND0jXZPauwsk6hBxYDi3gERL4gI5nwqgh+aNXtyRzbjn3YsNHE/Qo9ru3bunuEKTKfVdWAHDPkM0YdXH7lOaBXClgnctQCk7tPTD2NcIJHAlgqfpoFh9jB7NjwXwBMBGECH8Gk2U7TWuJA1nrWtAl8MRxSJ9sKTJGIcrkTKiOnFu3FNYHuB6g8vlk5GjmmnxuzfwbKP6HJeeukCk4Dr3zgrh5DyciY0DKSz03t1EsvMdzkTN8hYpLJHTEtsznDHB9BQSFNMx0sIlTMXO0LRmB3QC46y+t0Qkdca+t5DgPzdB3K313bsjxOQPsXdPj3kDXXRv07t377omEpeptICZ4QUwhSyIuFJIdE5kmpV7FqiH9AKTIY8MPYtJL2NHAf1AJulaOPEWcziy9hPS7cEoxonIeXGkpzbeN2Q4LYhkLUxxpGceCTKcdo/0UGNYSnqbgYFpGGUCRtJbZwwa4aS3Uu3MSdbj+obkzCb7LoHkLG0XTXKY5b0gOdUIv1tAcgCwmZMRnwK0TzNkpH8m0utPxqUkRyZQyyVSHZb67jipafneu+skd4NIdhjQN0l0KQEA9YJ/Yn2MqJgAAAAASUVORK5CYII='; // eslint-disable-line

class UserGuideStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
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
  render() {
    const last = this.props.steps.length - 1;
    const multple = this.props.steps.length > 0;
    const finalText = this.props.finalText || (multple ?
      texts[this.props.locale].final : texts[this.props.locale].done);
    return (<div className="guide-holder">
      {this.props.steps.map((s, index) => {
        const center = this.getCenter(s);
        const visible = (this.state.currentStep === index) || this.props.designMode;
        const hint = (
          <div
            className="step-hint"
          >
            <div className="step-hint-title">
              {s.title}
            </div>
            {!s.contentType || s.contentType === 'TEXT' &&
              <div className="step-hint-desc">{s.content}</div>}
            {s.contentType === 'IMAGE' &&
              <div className="step-hint-desc"><img role="presentation" src={s.content} /></div>
            }
            {s.contentType === 'VIDEO' &&
              <div className="step-hint-desc">
                <video
                  controls="true"
                  src={s.content}
                  poster={s.poster}
                  preload="auto"
                />
              </div>
            }
            <div className="hint-bottom">
              <span
                role="button"
                className="skip-text"
                onClick={() => this.nextStep(this.props.steps.length - 1)}
              >
                {texts[this.props.locale].skip}
              </span>
              <button
                className="kuma-button-sm kuma-button-primary"
                onClick={() => { this.nextStep(index); }}
              >
                {index === last ? finalText : texts[this.props.locale].next}
              </button>
              {
                index > 0 &&
                (<button
                  className="kuma-button-sm kuma-button-secondary"
                  onClick={() => { this.nextStep(index - 2); }}
                >
                  {texts[this.props.locale].prev}
                </button>)
              }
            </div>
          </div>);
        return (<Tooltip
          overlay={hint}
          placement="bottomRight"
          trigger={['click']}
          visible={visible}
          overlayClassName="kuma-user-guide-stage-step-hint"
          key={s.step}
        >
          <div
            key={s.step}
            className={`breathing-point${visible ? '' : ' hidden'}`}
            style={{
              top: (center.y + center.h / 2 - 20) || 0,
              left: (center.x + center.w / 2 - 20) || 0,
            }}
          >
            <div className="big"></div>
            <div className="small"></div>
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
};

UserGuideStage.propTypes = {
  steps: PropTypes.array,
  done: PropTypes.func,
  locale: PropTypes.string,
  finalText: PropTypes.string,
  designMode: PropTypes.bool,
};

UserGuideStage.displayName = 'UserGuideStage';

module.exports = UserGuideStage;
