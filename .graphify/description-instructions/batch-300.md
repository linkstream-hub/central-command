# Node Description Batch 301 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "graphs_graph_report_community_3694_community_3694": "Community 3694 - \"Community 3694\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18100 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3695_community_3695": "Community 3695 - \"Community 3695\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18104 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3696_community_3696": "Community 3696 - \"Community 3696\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18108 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3697_community_3697": "Community 3697 - \"Community 3697\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18112 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3698_community_3698": "Community 3698 - \"Community 3698\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18116 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3699_community_3699": "Community 3699 - \"Community 3699\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18120 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_37_exec_api_mock_guards": "Community 37 - \"Exec API + Mock Guards\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4848 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_370_community_370": "Community 370 - \"Community 370\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5964 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3700_community_3700": "Community 3700 - \"Community 3700\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18124 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3701_community_3701": "Community 3701 - \"Community 3701\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18128 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3702_community_3702": "Community 3702 - \"Community 3702\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18132 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3703_community_3703": "Community 3703 - \"Community 3703\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18136 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3704_community_3704": "Community 3704 - \"Community 3704\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18140 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3705_community_3705": "Community 3705 - \"Community 3705\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18144 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3706_community_3706": "Community 3706 - \"Community 3706\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18148 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3707_community_3707": "Community 3707 - \"Community 3707\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18152 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3708_community_3708": "Community 3708 - \"Community 3708\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18156 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3709_community_3709": "Community 3709 - \"Community 3709\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18160 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_371_community_371": "Community 371 - \"Community 371\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5968 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3710_community_3710": "Community 3710 - \"Community 3710\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18164 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3711_community_3711": "Community 3711 - \"Community 3711\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18168 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3712_community_3712": "Community 3712 - \"Community 3712\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18172 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3713_community_3713": "Community 3713 - \"Community 3713\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18176 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3714_community_3714": "Community 3714 - \"Community 3714\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18180 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3715_community_3715": "Community 3715 - \"Community 3715\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18184 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3716_community_3716": "Community 3716 - \"Community 3716\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18188 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3717_community_3717": "Community 3717 - \"Community 3717\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18192 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3718_community_3718": "Community 3718 - \"Community 3718\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18196 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3719_community_3719": "Community 3719 - \"Community 3719\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18200 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_372_community_372": "Community 372 - \"Community 372\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5972 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3720_community_3720": "Community 3720 - \"Community 3720\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18204 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3721_community_3721": "Community 3721 - \"Community 3721\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18208 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3722_community_3722": "Community 3722 - \"Community 3722\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18212 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3723_community_3723": "Community 3723 - \"Community 3723\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18216 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3724_community_3724": "Community 3724 - \"Community 3724\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18220 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3725_community_3725": "Community 3725 - \"Community 3725\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18224 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3726_community_3726": "Community 3726 - \"Community 3726\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18228 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3727_community_3727": "Community 3727 - \"Community 3727\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18232 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3728_community_3728": "Community 3728 - \"Community 3728\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18236 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3729_community_3729": "Community 3729 - \"Community 3729\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18240 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-300.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
