import React, { PropTypes } from "react";

import {
  isLaTeXExpr,
  hasTextExpression,
} from "@workspace/components/widgets/annotation_editor/convertFormats";
import { _ } from "@common/utils/i18n";

const getMessages = value => {
  if (!isLaTeXExpr(value)) {
    return [
      _(
        "LaTeX is a math typesetting language that doesn't work with rich text."
      ),
      _("Continuing will convert your note to LaTeX-style text."),
    ];
  }

  if (hasTextExpression(value)) {
    return [
      _("Rich text is incompatible with LaTeX."),
      _("Continuing will convert your LaTeX expression into raw text."),
    ];
  }

  return [
    _("Rich text is incompatible with LaTeX."),
    _("Continuing will remove your expression."),
  ];
};

const FormatSwitchConfirmationPanel = props => {
  const messages = getMessages(props.value);

  return (
    <div className="confirmation-panel">
      <div className="block-group">
        <div className="block +text-center">
          <h5 className="confirmation-panel__header +weight-semibold">
            {_("Heads up!")}
          </h5>

          <p className="+weight-normal">{messages[0]}</p>

          <p className="+weight-light">{messages[1]}</p>
        </div>

        <div className="block block-50 +text-center">
          <button
            className="btnbase btn--default confirmation-panel__btn-cancel"
            onClick={props.onCancel}
          >
            {_("Go back")}
          </button>
        </div>

        <div className="block block-50 +text-center">
          <button
            className="btnbase btn--primary confirmation-panel__btn-continue"
            onClick={props.onContinue}
          >
            {_("Continue")}
          </button>
        </div>
      </div>
    </div>
  );
};

FormatSwitchConfirmationPanel.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default FormatSwitchConfirmationPanel;
