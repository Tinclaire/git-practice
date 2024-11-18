from discord_webhook import DiscordWebhook, DiscordEmbed
import json

webhook = DiscordWebhook(url="https://discord.com/api/webhooks/1308155406178189363/UxAIcMpDysnpFpsM89GIIM6Ff5RGHjXPmUrEN-NeWVfqmjzETf8xsPmUmBt0oXqT98A-")

embed = DiscordEmbed(
    title="EC2 CPU Utilization Alarm!!",
    description="CPU Utilization is greater than 60",
    color="03b2f8")

webhook.add_embed(embed)
webhook.execute()

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
