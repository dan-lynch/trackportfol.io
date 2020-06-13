gpg --symmetric --cipher-algo AES256 backend/db/init/00-tables.sql
gpg --symmetric --cipher-algo AES256 backend/db/init/01-functions.sql
gpg --symmetric --cipher-algo AES256 backend/db/init/02-policies.sql
gpg --symmetric --cipher-algo AES256 backend/db/init/03-instruments.sql
gpg --symmetric --cipher-algo AES256 .env