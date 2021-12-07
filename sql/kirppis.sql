CREATE TABLE User
(
    UserName VARCHAR (60) NOT NULL,
    Password VARCHAR (60) NOT NULL,
    FirstName VARCHAR (60) NOT NULL,
    LastName VARCHAR (60) NOT NULL,
    Email VARCHAR (60) NOT NULL,
    ProfilePicture VARCHAR (60) NOT NULL,
    Bio VARCHAR (60) NOT NULL,
    PRIMARY KEY (UserName)
);

CREATE TABLE Chat
(
    ChatId INT NOT NULL,
    PRIMARY KEY (ChatId)
);

CREATE TABLE Category
(
    CategoryName VARCHAR (60) NOT NULL,
    CategoryId INT NOT NULL,
    PRIMARY KEY (CategoryId)
);

CREATE TABLE ChatMessage
(
    MessageText VARCHAR (60) NOT NULL,
    MessageOrder INT NOT NULL,
    ChatId INT NOT NULL,
    PRIMARY KEY (MessageOrder, ChatId),
    FOREIGN KEY (ChatId) REFERENCES Chat(ChatId)
);

CREATE TABLE UserChat
(
    ChatId INT NOT NULL,
    UserName VARCHAR (60) NOT NULL,
    PRIMARY KEY (ChatId, UserName),
    FOREIGN KEY (ChatId) REFERENCES Chat(ChatId),
    FOREIGN KEY (UserName) REFERENCES User(UserName)
);

CREATE TABLE Product
(
    PictureId INT NOT NULL,
    Gps INT NOT NULL,
    Price INT NOT NULL,
    Caption VARCHAR (60) NOT NULL,
    LikeCount INT NOT NULL,
    ImageLocation INT NOT NULL,
    UserName VARCHAR (60) NOT NULL,
    CategoryId INT NOT NULL,
    PRIMARY KEY (PictureId),
    FOREIGN KEY (UserName) REFERENCES User(UserName),
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

CREATE TABLE Comment
(
    CommentText VARCHAR (60) NOT NULL,
    CommentId INT NOT NULL,
    UserName VARCHAR (60) NOT NULL,
    PictureId INT NOT NULL,
    PRIMARY KEY (CommentId),
    FOREIGN KEY (UserName) REFERENCES User(UserName),
    FOREIGN KEY (PictureId) REFERENCES Product(PictureId)
);

CREATE TABLE Likes
(
    UserName VARCHAR (60) NOT NULL,
    PictureId INT NOT NULL,
    PRIMARY KEY (UserName, PictureId),
    FOREIGN KEY (UserName) REFERENCES User(UserName),
    FOREIGN KEY (PictureId) REFERENCES Product(PictureId)
);