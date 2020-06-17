gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output db/init/00-tables.sql db/init/00-tables.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output db/init/01-functions.sql db/init/01-functions.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output db/init/02-policies.sql db/init/02-policies.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output db/init/03-instruments.sql db/init/03-instruments.sql.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output pyService.zip pyService.zip.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$PASSPHRASE" \
--output .env .env.gpg