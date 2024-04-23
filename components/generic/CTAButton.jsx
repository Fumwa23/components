import { Button } from "@mui/material";

const CTAButton = (props) => {
    const style = {
        fontSize: "16px",
        backgroundImage: "linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)",
        margin: "10px",
        padding: "10px 45px",
        textAlign: "center",
        textTransform: "uppercase",
        transition: "0.5s",
        backgroundSize: "200% auto",
        color: "white",            
        boxShadow: "0 0 20px #eee",
        borderRadius: "10px",
        display: "block",
        textDecoration: "none",
    }

    return <Button {...props} style={style}>{props.children}</Button>
}

export default CTAButton