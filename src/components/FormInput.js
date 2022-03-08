import {
  Button,
  ButtonGroup,
  Form,
  Spinner,
  ToggleButton,
} from "react-bootstrap";

export const LogoInput = ({ src, alt, height, className, onClick }) => {
  return (
    <>
      <div>
        <label>Logo</label>
      </div>
      <div className="d-flex justify-content-center">
        <img
          src={src}
          alt={alt}
          height={height}
          className={className}
          onClick={onClick}
        />
      </div>
    </>
  );
};

export const TextInput = ({
  as,
  style,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Form.Group className="mb-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={as}
        style={style}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </Form.Group>
  );
};

export const ButtonInputLabel = ({ label, variant, onClick, children }) => {
  return (
    <>
      <div className="d-flex align-items-center">
        <label>{label}</label>
        <Button variant={variant} onClick={onClick} size="sm" className="m-2">
          +
        </Button>
      </div>
      <ButtonGroup className="d-flex flex-wrap" size="sm">
        {children}
      </ButtonGroup>
    </>
  );
};

export const ButtonInput = ({ tag, value, variant, onClick, checked }) => {
  return (
    <ToggleButton
      className="m-1 rounded"
      type="checkbox"
      value={value}
      variant={variant}
      onClick={onClick}
      checked={checked}
    >
      {tag.toUpperCase()}
    </ToggleButton>
  );
};

export const SubmitButton = ({ loading, onClick }) => {
  return (
    <>
      <div className="d-grid gap-2 mt-5">
        <Button variant="outline-success" type="submit">
          {loading ? <Spinner animation="border" size="sm" /> : "Valider"}
        </Button>
      </div>
      <div className="text-danger mt-2" style={{ cursor: "pointer" }}>
        <p onClick={onClick}>{!loading && "Réinitialiser"}</p>
      </div>
    </>
  );
};
