export const Theme = {
    body: {
        backgroundColor: "$mainBackground",
        color: "$mainText",
        fontFamily: "Arial, sans-serif",
        ".hero-section": {
            textAlign: "center",
            padding: "50px 0"
        },
        div:{
            backgroundColor:'red'
        },
        ".sticky-nav": {
            backgroundColor: "$navBackground",
            position: "sticky",
            top: "0",
            ul: {
                listStyleType: "none",
                margin: "0",
                padding: "0",
                overflow: "hidden"
            },
            li: {
                float: "left"
            },
            a: {
                display: "block",
                textAlign: "center",
                padding: "14px 16px",
                textDecoration: "none",
                color: "$navText"
            }
        },
        ".cta-button": {
            backgroundColor: "$buttonBackground",
            color: "$buttonText",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            ":hover": {
                backgroundColor: "$buttonHoverBackground"
            }
        },
        ".inline-link": {
            color: "$linkText",
            textDecoration: "none",
            ":hover": {
                textDecoration: "underline"
            }
        },
        ".content-section": {
            padding: "20px"
        }
    }
};
