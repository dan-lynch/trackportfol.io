echo "Running config script"
sed -i 's/^#wal_level.*/wal_level = logical/g' /var/lib/postgresql/data/postgresql.conf
sed -i 's/^#max_replication_slots=.*/max_replication_slots = 10/g' /var/lib/postgresql/data/postgresql.conf
sed -i 's/^#max_replication_slots =.*/max_replication_slots = 10/g' /var/lib/postgresql/data/postgresql.conf
sed -i 's/^#max_wal_senders =.*/max_wal_senders = 10/g' /var/lib/postgresql/data/postgresql.conf