import React, { PropTypes } from 'react'
import uniqueId from '../../common/utils/unique_id'

export const MODAL_SHOW = 'SHOW'
export const MODAL_HIDE = 'HIDE'
export const CLOSE_BUTTON_SHOW = 'SHOW'
export const CLOSE_BUTTON_HIDE = 'HIDE'
export const CLOSE_ON_BACKGROUND = 'CLOSE'
export const CLOSE_ON_BACKGROUND_DISABLED = 'DO_NOTHING'

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.closeOnBackground = this.closeOnBackground.bind(this)
  }

  componentWillMount() {
    this.id = uniqueId('modal')

    this.state = {
      modalMode: this.props.modalMode,
      closeOnBackgroundMode: this.props.closeOnBackgroundMode,
      closeButtonMode: this.props.closeButtonMode,
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalMode: nextProps.modalMode,
      closeOnBackgroundMode: nextProps.closeOnBackgroundMode,
      closeButtonMode: nextProps.closeButtonMode,
    })
  }

  showModal() {
    this.setState({ ...this.state, modalMode: MODAL_SHOW })
  }

  hideModal() {
    this.setState({ ...this.state, modalMode: MODAL_HIDE })
  }

  closeOnBackground(e) {
    if (this.state.closeOnBackgroundMode !== CLOSE_ON_BACKGROUND) {
      return null
    }

    if (e.target.id === this.id) {
      this.hideModal()
    }

    return null
  }

  get isActive() {
    const { modalMode } = this.state

    return modalMode === MODAL_SHOW ? 'is-active' : ''
  }

  get isCloseOnBackgroundEnabled() {
    const { closeOnBackgroundMode } = this.state

    return closeOnBackgroundMode === CLOSE_ON_BACKGROUND ? 'overlay-close-enabled' : ''
  }

  get isCloseButtonEnabled() {
    const { closeButtonMode } = this.state

    return closeButtonMode === CLOSE_BUTTON_HIDE ? 'hidden' : ''
  }

  render() {
    if (!this.isActive) {
      return null
    }

    return (
      <div
        className={`modal-overlay is-active ${this.isCloseOnBackgroundEnabled}`}
        onClick={this.closeOnBackground}
        id={this.id}
        tabIndex={0}
      >
        <aside className={'modal is-active'}>
          <a
            className={`close-button ${this.isCloseButtonEnabled}`}
            onClick={this.hideModal}
            tabIndex={0}
          >
            ×
          </a>
          {this.props.children}
        </aside>
      </div>
    )
  }
}

Modal.propTypes = {
  modalMode: PropTypes.string,
  closeOnBackgroundMode: PropTypes.string,
  closeButtonMode: PropTypes.string,
}
Modal.defaultProps = {
  modalMode: MODAL_SHOW,
  closeOnBackgroundMode: CLOSE_ON_BACKGROUND_DISABLED,
  closeButtonMode: CLOSE_BUTTON_SHOW,
}

export default Modal
