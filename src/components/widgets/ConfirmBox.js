/**
 * ConfirmBox A generic div offering a 'confirm' and 'cancel' button with some
 * text that can be passed in with props.
 *
 * The main content is wrapped in another div to add additional modal-styling
 * options. Layout should be set via `className` and `wrapperClassName`.
 *
 * @module
 */
import React, { PropTypes } from "react";
import classnames from "classnames";

import { _ } from "@common/utils/i18n";

// Just pulling some styling constants out of our render method.
const baseConfirmBoxClassName = classnames("js-confirm-box", "+text-center");
const baseConfirmBoxWrapperClassName = classnames("js-confirm-box__wrapper");
const headerClassName = classnames(
  "js-confirm-box__header",
  "confirmbox__title"
);
const cancelBtnClassName = classnames(
  "js-confirm-box__cancel",
  "btnbase",
  "btn--default",
  "+push-half-sides"
);
const baseConfirmBtnClassName = classnames(
  "js-confirm-box__confirm",
  "btnbase",
  "btn--primary",
  "+push-half-sides"
);
const alternativeBtnClassName = classnames(
  "js-confirm-box__alternative",
  "btnbase",
  "btn--primary",
  "+push-half-sides"
);

const propTypes = {
  // Required props
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,

  // Optional text
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  headerText: PropTypes.string,
  alternativeText: PropTypes.string,

  /*
     * Optional classes & styling. You can use className and wrapperClassName
     * to create PopStore-ready modals or custom, embedded modals.
     */
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,

  // Optional functionality
  dangerous: PropTypes.bool,
  dangerouslySetMessageInnerHtml: PropTypes.bool,
  hideCancel: PropTypes.bool,
  onAlternative: PropTypes.func,
  showAlternative: PropTypes.bool,
};

const defaultProps = {
  // Optional text
  cancelText: _("Cancel"),
  confirmText: _("Confirm"),
  headerText: _("Confirm?"),
  alternativeText: _("Alternative"),

  // Optional functionality
  dangerous: false,
  dangerouslySetMessageInnerHtml: false,
  hideCancel: false,
  showAlternative: false,
};

const ConfirmBox = props => {
  const {
    alternativeText,
    cancelText,
    className,
    dangerouslySetMessageInnerHtml,
    confirmText,
    dangerous,
    headerText,
    hideCancel,
    message,
    onAlternative,
    onCancel,
    onConfirm,
    showAlternative,
    wrapperClassName,
  } = props;

  if (showAlternative && !onAlternative) {
    throw new Error("Missing onAlternative function.");
  }

  const confirmBoxClassName = classnames(baseConfirmBoxClassName, className);
  const confirmBoxWrapperClassName = classnames(
    baseConfirmBoxWrapperClassName,
    wrapperClassName
  );
  const confirmBtnClassName = classnames(baseConfirmBtnClassName, {
    "btn--danger": dangerous,
  });

  let msg;
  if (dangerouslySetMessageInnerHtml) {
    const innerHTML = { __html: message };
    msg = (
      <p className="confirmbox__message" dangerouslySetInnerHTML={innerHTML} />
    );
  } else {
    msg = <p className="confirmbox__message">{message}</p>;
  }

  const cancelBtn = (
    <button className={cancelBtnClassName} onClick={onCancel}>
      {cancelText}
    </button>
  );

  const confirmBtn = (
    <button className={confirmBtnClassName} onClick={onConfirm}>
      {confirmText}
    </button>
  );

  const alternativeBtn = (
    <button className={alternativeBtnClassName} onClick={onAlternative}>
      {alternativeText}
    </button>
  );

  return (
    <div className={confirmBoxWrapperClassName}>
      <div className={confirmBoxClassName}>
        <h2 className={headerClassName}>{headerText}</h2>

        {msg}

        <span>
          {hideCancel ? null : cancelBtn}
          {showAlternative ? alternativeBtn : null}
          {confirmBtn}
        </span>
      </div>
    </div>
  );
};

ConfirmBox.propTypes = propTypes;

ConfirmBox.defaultProps = defaultProps;

export default ConfirmBox;
