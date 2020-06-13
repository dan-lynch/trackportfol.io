gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output backend/db/init/00-tables.sql backend/db/init/00-tables.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output backend/db/init/01-functions.sql backend/db/init/01-functions.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output backend/db/init/02-policies.sql backend/db/init/02-policies.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output backend/db/init/03-instruments.sql backend/db/init/03-instruments.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output .env .env.gpg