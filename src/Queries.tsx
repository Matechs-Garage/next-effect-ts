// tracing: off

import * as Q from "@effect-ts/query/Query"

import { App } from "./App"
import { ArtworkDataSource } from "./DataSources"
import { Artwork, Artworks } from "./Domain"
import { GetArtwork, GetArtworks } from "./Requests"

//
// Queries
//

export const getArtwork = App.query(
  (url: string) =>
    Q.gen(function* (_) {
      const { artworkDataSource } = yield* _(ArtworkDataSource)
      return yield* _(Q.fromRequest(new GetArtwork({ url }), artworkDataSource))
    }),
  App.querySuccessCodec(Artwork.Model, (url) => `getArtwork(${url})`)
)

export const getArtworks = App.query(
  (page: number) =>
    Q.gen(function* (_) {
      const { artworkDataSource } = yield* _(ArtworkDataSource)
      return yield* _(Q.fromRequest(new GetArtworks({ page }), artworkDataSource))
    }),
  App.querySuccessCodec(Artworks.Model, (page) => `getArtworks(${page})`)
)