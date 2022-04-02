import { useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Form,
  FormControl,
  InputGroup,
  Spinner,
  ToggleButton,
} from "react-bootstrap";

export const LogoInput = ({ src, alt, height, className, onClick }) => {
  return (
    <>
      <div>
        <label>LOGO</label>
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
    <Form.Group className="mb-3">
      <Form.Label>{label.toUpperCase()}</Form.Label>
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

export const ButtonInputLabel = ({
  label,
  name,
  variant,
  value,
  onClick,
  onChange,
  children,
}) => {
  const [addInput, setAddInput] = useState(false);
  return (
    <>
      <div className="d-flex align-items-center">
        <label>{label.toUpperCase()}</label>
        <Badge
          bg="info"
          onClick={() => setAddInput(!addInput)}
          className="m-1"
          style={{ cursor: "pointer" }}
        >
          {addInput ? "❌​" : "➕"}
        </Badge>
        {addInput && (
          <div>
            <InputGroup size="sm">
              <FormControl
                name={name}
                placeholder="Ajouter..."
                value={value}
                onChange={onChange}
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
              />
              {value.trim("") && (
                <Button variant={variant} onClick={onClick}>
                  +
                </Button>
              )}
            </InputGroup>
          </div>
        )}
      </div>
      <ButtonGroup className="d-flex flex-wrap" size="sm">
        {children}
      </ButtonGroup>
    </>
  );
};

export const BadgePill = ({ value, bg, onClick }) => {
  return (
    <Badge
      pill
      bg={bg}
      onClick={onClick}
      style={{ cursor: "pointer", margin: "2px", userSelect: "none" }}
    >
      {value.toUpperCase()}
    </Badge>
  );
};

export const ButtonInput = ({ value, variant, onClick, checked }) => {
  return (
    <ToggleButton
      className="m-1 rounded"
      type="checkbox"
      size="sm"
      variant={variant}
      onClick={onClick}
      checked={checked}
    >
      {value.toUpperCase()}
    </ToggleButton>
  );
};

export const SubmitButton = ({ loading, onClick }) => {
  return (
    <>
      <div className="text-primary mt-4" style={{ cursor: "pointer" }}>
        <p onClick={onClick}>{!loading && "Réinitialiser"}</p>
      </div>
      <div className="d-grid gap-2 my-2">
        <Button variant="outline-success" type="submit">
          {loading ? <Spinner animation="border" size="sm" /> : "Valider"}
        </Button>
      </div>
    </>
  );
};
