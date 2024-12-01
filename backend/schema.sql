BEGIN TRANSACTION;

CREATE TABLE users (
    id INTEGER PRIMARY KEY, -- Uses SQLite's AUTOINCREMENT behavior if no value is provided
    username TEXT NOT NULL UNIQUE, -- Ensures unique usernames
    password TEXT NOT NULL -- Store hashed passwords as TEXT
);

-- Insert some sample users
INSERT INTO users (username, password) VALUES ('paavo', 'pesusieni');
INSERT INTO users (username, password) VALUES ('molla', 'maija');


CREATE TABLE blogs (
    id INTEGER PRIMARY KEY, -- Unique blog identifier
    user_id INTEGER NOT NULL, -- Foreign key referencing the user
    title TEXT NOT NULL, -- Blog title
    content TEXT NOT NULL, -- Blog content
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the blog is created
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    -- "ON DELETE CASCADE" ensures that if a user is deleted, their blogs are too
);

-- Insert some sample blogs
INSERT INTO blogs (user_id, title, content) VALUES (1, 'Ensimmäinen blogini', 'Taivas on sininen, maassa kukat puhkeaa. Puiden varjot tanssivat, ja sydän rauhoittuu.');
INSERT INTO blogs (user_id, title, content) VALUES (2, 'Sauna', 'Sauna on osa suomalaista kulttuuria, ja se on monille tärkeä paikka rentoutua ja nauttia rauhasta. Sauna on ollut osa suomalaisia perinteitä vuosisatojen ajan, ja sen tunnelma on ainutlaatuinen. Suomalaiset käyvät saunassa monenlaisissa tilaisuuksissa – yksin, perheen kanssa tai ystävien seurassa.');

COMMIT;

-- Enable foreign key enforcement (SQLite requires this)
PRAGMA foreign_keys = ON;