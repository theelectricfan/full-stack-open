```mermaid
    sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa Note data (json format)
    activate server
    server-->>browser: {"message":"note created"} json

    Note over browser: The browser starts executing the JavaScript code<br/>that modifies the existing dom to add new data
