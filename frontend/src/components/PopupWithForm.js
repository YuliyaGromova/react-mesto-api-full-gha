import close from "../images/close.svg";
import successIcon from "../images/icon.svg";
import failIcon from "../images/Union.svg";

function PopupWithForm(props) {
  return (
    <section
      className={(props.isOpen)? "popup popup_opened" : "popup"}
      id={props.name}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__toggle button"
          name="closePopup"
          onClick={props.onClose}
        >
          <img className="popup__toggle-image" src={close} alt="закрыть" />
        </button>
        {(typeof props.answer == "undefined")? <form className="popup__edit" name={props.name} onSubmit={props.onSubmit} noValidate>
          <h2 className="popup__heading">{props.title}</h2>
          {props.children}
          <button className="popup__submit" type="submit" name="saveEdit">
          {props.nameButton}
        </button>
        </form> :
        <div className="popup__tooltip" style={{backgroundImage: `url(${(props.answer)? successIcon: failIcon})`}}>
          <p className="popup__message">{(props.answer)? "Вы успешно зарегистрировались!": "Что-то пошло не так! Попробуйте ещё раз."}</p>
        </div>
        }
        
      </div>
    </section>
  );
}

export default PopupWithForm;
