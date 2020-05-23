gpg --symmetric --cipher-algo AES256 backend/db/init/00-database.sql
gpg --symmetric --cipher-algo AES256 backend/db/init/01-functions-1.sql
gpg --symmetric --cipher-algo AES256 backend/db/init/02-functions-2.sql
gpg --symmetric --cipher-algo AES256 backend/db/init/03-policies.sql
gpg --symmetric --cipher-algo AES256 backend/db/init/04-instruments.sql