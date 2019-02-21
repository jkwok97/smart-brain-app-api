BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined )
VALUES ('Jessie', 'jessie@test.com', 0, '2018-01-01');

INSERT into login (hash, email)
VALUES ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'jessie@test.com');

COMMIT;