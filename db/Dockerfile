FROM postgres:13 AS build
ENV WAL2JSON_COMMIT_ID=c54d89649c3fe5e0aa79c3a87493935232e962a7
RUN apt-get update && \
    apt-get install -f -y --no-install-recommends \
        software-properties-common \
        build-essential \
        pkg-config \
        git \
        postgresql-server-dev-$PG_MAJOR
RUN git clone https://github.com/eulerto/wal2json -b master --single-branch \
    && cd /wal2json \
    && git checkout $WAL2JSON_COMMIT_ID \
    && make && make install \
    && cd / \
    && rm -rf wal2json
FROM postgres:13
COPY --from=build /usr/lib/postgresql/$PG_MAJOR/lib/wal2json.so /usr/lib/postgresql/$PG_MAJOR/lib/
COPY ./init/ /docker-entrypoint-initdb.d/