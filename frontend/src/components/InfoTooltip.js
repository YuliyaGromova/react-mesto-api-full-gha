import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      answer = {props.answerReg}
      name = 'tooltip'

    >
    </PopupWithForm>
  );
}

export default InfoTooltip;
